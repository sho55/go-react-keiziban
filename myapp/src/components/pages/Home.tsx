import { memo, FC, useEffect } from "react";
import { useAllPosts } from "../hooks/useAllPosts";
import TweetCard from "../TweetCard";
import { Flex } from "@chakra-ui/react";

export const Home: FC = memo(() => {
    const { getPosts, postData, loading, error } = useAllPosts();

    useEffect(() => {
        getPosts();
    }, []); // 空の依存配列を渡すことで、一度だけ実行されます

    return (
        <>
            {error ? (
                <p style={{ color: "red" }}>データの取得失敗しました</p>
            ) : loading ? (
                    <>
                    <Flex justifyContent="center" alignItems="center">
                    <p>Loading...</p>
                    </Flex>
                    </>
            ) : postData ? (
                <>
                    {postData.map((post) => (
                        <TweetCard key={post.id} post={post} />
                    ))}
                </>
            ) : (
                <>
                    <p>データはありません。</p>
                </>
            )}
        </>
    );
});
