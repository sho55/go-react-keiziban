package pkg

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"os"

	"github.com/joho/godotenv"

	_ "github.com/go-sql-driver/mysql"
)

type Post struct {
    ID        int64     `json:"id"`
    Username  string    `json:"username"`
    Body      string    `json:"body"`
    CreatedAt string    `json:"created_at"`
    UpdatedAt string    `json:"updated_at"`
}

func ConnectDB() (*sql.DB, error) {
    // 環境変数を読み込む
    err := godotenv.Load("../.env")
    if err != nil {
        return nil, fmt.Errorf("error loading .env file: %w", err)
    }

    // DB接続情報を取得
    user := os.Getenv("USER_NAME")
    password := os.Getenv("USER_PASSWORD")
    host := os.Getenv("DB_CONTAINER")
    port := os.Getenv("DB_PORT")
    databaseName := os.Getenv("DATABASE")

    dbconf := user + ":" + password + "@tcp(" + host + ":" + port + ")/" + databaseName + "?charset=utf8mb4"

    // データベースに接続
    db, err := sql.Open("mysql", dbconf)
    if err != nil {
        return nil, fmt.Errorf("error connecting to the database: %w", err)
    }

    // 接続をテスト
    err = db.Ping()
    if err != nil {
        db.Close()
        return nil, fmt.Errorf("error pinging the database: %w", err)
    }

    return db, nil
}

func GetTables() (string, error){
    // ConnectDB関数を利用したDB接続
    db, err := ConnectDB()
    if err != nil {
        fmt.Printf("Failed to connect to database: %v\n", err)
        return "", err
    }
    defer db.Close()

    rows, err := db.Query("SELECT * FROM posts ORDER BY created_at desc")
    if err != nil {
        fmt.Printf("Query failed: %v\n", err)
        return "", err
    }
    defer rows.Close()

    posts := []Post{}

    for rows.Next() {
        var p Post
        err = rows.Scan(&p.ID, &p.Username, &p.Body, &p.CreatedAt, &p.UpdatedAt)
        if err != nil {
            fmt.Printf("Row scan failed: %v\n", err)
            return "", err
        }
        posts = append(posts, p)
    }

    jsonData, err := json.Marshal(posts)
    if err != nil {
        fmt.Printf("JSON marshaling failed: %v\n", err)
        return "", err
    }

    return string(jsonData), nil
}

func GetPost(postID int64) (Post, error) {

    // ConnectDB関数を利用したDB接続
    db, err := ConnectDB()
    if err != nil {
        return Post{}, fmt.Errorf("Failed to connect to database: %v", err)
    }
    defer db.Close()

    row := db.QueryRow("SELECT * FROM posts WHERE id = ?", postID)


    var p Post
    err = row.Scan(&p.ID, &p.Username, &p.Body, &p.CreatedAt, &p.UpdatedAt)
    if err == sql.ErrNoRows {
        // No post found with the specified ID
        return Post{}, fmt.Errorf("Post not found")
    } else if err != nil {
        return Post{}, fmt.Errorf("Row scan failed: %v", err)
    }

    return p, nil
}

func EditPost(postID int64, body string) error {
    // ConnectDB関数を利用したDB接続
    db, err := ConnectDB()
    if err != nil {
        return fmt.Errorf("Failed to connect to database: %v", err)
    }
    defer db.Close()

    // プレースホルダーを使ってSQLインジェクションを防ぐ
    stmt, err := db.Prepare("UPDATE posts SET body = ? WHERE id = ?")
    if err != nil {
        return fmt.Errorf("Prepare failed: %v", err)
    }
    defer stmt.Close()

    // UPDATE文を実行
    res, err := stmt.Exec(body, postID)
    if err != nil {
        return fmt.Errorf("Update failed: %v", err)
    }

    // 結果をチェック
    affected, err := res.RowsAffected()
    if err != nil {
        return fmt.Errorf("RowsAffected failed: %v", err)
    }

    fmt.Printf("Update success: affected=%d\n", affected)

    return nil
}

func DeletePost(postID int64) error {
    // ConnectDB関数を利用したDB接続
    db, err := ConnectDB()
    if err != nil {
        return fmt.Errorf("Failed to connect to database: %v", err)
    }
    defer db.Close()

    // プレースホルダーを使ってSQLインジェクションを防ぐ
    stmt, err := db.Prepare("DELETE FROM posts WHERE id = ?")
    if err != nil {
        return fmt.Errorf("Prepare failed: %v", err)
    }
    defer stmt.Close()

    // UPDATE文を実行
    res, err := stmt.Exec(postID)
    if err != nil {
        return fmt.Errorf("Update failed: %v", err)
    }

    // 結果をチェック
    affected, err := res.RowsAffected()
    if err != nil {
        return fmt.Errorf("RowsAffected failed: %v", err)
    }

    fmt.Printf("Delete success: affected=%d\n", affected)

    return nil
}




func InsertValues(post *Post) error{
    db, err := ConnectDB()
    if err != nil {
        return fmt.Errorf("Failed to connect to database: %v", err)
    }
    defer db.Close()
    // プレースホルダーを使ってSQLインジェクションを防ぐ
    stmt, err := db.Prepare(fmt.Sprintf("INSERT INTO %s (username, body) VALUES (?, ?)", "posts"))
    if err != nil {
        return fmt.Errorf("Prepare failed: %v", err)
    }
    defer stmt.Close()
    

    res, err := stmt.Exec(post.Username, post.Body)
    if err != nil {
        return fmt.Errorf("Insert failed: %v", err)
    }
    
    // 結果をチェック
    lastID, err := res.LastInsertId()
    if err != nil {
        return fmt.Errorf("LastInsertId failed: %v", err)
    }
    affected, err := res.RowsAffected()
    if err != nil {
        return fmt.Errorf("RowsAffected failed: %v", err)
    }

    fmt.Printf("Insert success: id=%d, affected=%d\n", lastID, affected)

    return nil
}