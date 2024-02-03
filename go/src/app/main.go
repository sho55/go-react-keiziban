package main

import (
	// "encoding/json"
	"fmt"
	"go/src/app/pkg"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Post struct {
    ID        int64  `json:"id"`
    Username  string `json:"username"`
    Body      string `json:"body"`
    CreatedAt string `json:"created_at"`
    UpdatedAt string `json:"updated_at"`
}

func main() {
    fmt.Println("Hello, World!")

    // ----- DB接続 ----- 
    pkg.ConnectDB()
    // ----------------- 
    
    app := fiber.New()

        // Initialize default config
        app.Use(cors.New(cors.Config{
            AllowOrigins: "http://localhost:3000",
            AllowHeaders:  "Origin, Content-Type, Accept",
        }))


    app.Get("/heathcheck", func(c *fiber.Ctx) error {
        return c.SendString("OKです")
    })

    app.Get("/post/list", func(c *fiber.Ctx) error {
        jsonData, err := pkg.GetTables()
        if err != nil {
           return c.SendString(err.Error()) 
        } 
        return c.SendString(jsonData)
    })

    app.Post("/post/create", func(c *fiber.Ctx) error {

        post := new(pkg.Post)
        if err := c.BodyParser(post); err != nil {
            return err
        }
        // postデータをInsertValuesに渡す
		err := pkg.InsertValues(post)
		if err != nil {
			return c.SendString(err.Error())
		}
		
		return c.SendString("Post created successfully")

    })

    app.Get("/post/detail/:id", func(c *fiber.Ctx) error {
        // パラメータからIDを取得
        idParam := c.Params("id")
        id := parseID(idParam)
        if id == -1 {
            return c.Status(fiber.StatusBadRequest).SendString("Invalid ID")
        }

        // IDに対応する投稿データを取得
        jsonData,err := pkg.GetPost(id)
        if err != nil {
            return c.Status(fiber.StatusNotFound).SendString("Post not found")
        }

        // 取得したデータをJSONとして返す
        return c.JSON(jsonData)
    })

    app.Put("/post/edit/:id", func(c *fiber.Ctx) error {
        // パラメータからIDを取得
        post := new(pkg.Post)
        if err := c.BodyParser(post); err != nil {
            return err
        }

        idParam := c.Params("id")
        id := parseID(idParam)
        if id == -1 {
            return c.Status(fiber.StatusBadRequest).SendString("Invalid ID")
        }

        // IDに対応する投稿データを取得
        err := pkg.EditPost(id,post.Body)
        if err != nil {
            return c.Status(fiber.StatusNotFound).SendString("Post not found")
        }

        // 取得したデータをJSONとして返す
        return c.SendString("Post updated successfully")
    })

    app.Post("/post/delete/:id", func(c *fiber.Ctx) error {

        idParam := c.Params("id")
        id := parseID(idParam)
        if id == -1 {
            return c.Status(fiber.StatusBadRequest).SendString("Invalid ID")
        }

        // IDに対応する投稿データを取得
        err := pkg.DeletePost(id)
        if err != nil {
            return c.Status(fiber.StatusNotFound).SendString("Post not found")
        }

        // 取得したデータをJSONとして返す
        return c.SendString("Post delete successfully")
    })

    log.Fatal(app.Listen(":8000")) 
}

// 文字列からIDをパースするヘルパー関数
func parseID(idStr string) int64 {
    var id int64
    _, err := fmt.Sscanf(idStr, "%d", &id)
    if err != nil {
        return -1
    }
    return id
}
