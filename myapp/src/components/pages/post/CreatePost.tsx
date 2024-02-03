import { FC, memo, useState } from 'react';
import { Box, Text, Flex, Input, Textarea, Button } from '@chakra-ui/react';
import { useInsertPost } from '../../hooks/useInsertPost';
import { useToastMessage } from '../../hooks/useToastMessage';
import { useHistory } from 'react-router-dom';

const CreatePost: FC = memo(() => {
    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');
    const history = useHistory();
    const { showMessage } = useToastMessage();

    const { insertPost } = useInsertPost({ username, body: content });

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = () => {
        // フォームの送信ロジックをここに追加
        insertPost()
        showMessage({ title: "投稿しました", status: "success" });
        history.push("/");
    };


    return (
        <Flex justifyContent="center" alignItems="center">
            <Box
                backgroundColor="whiteAlpha.900"
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                my={4}
                maxW="500px"
                w="100%"
            >
                <Input
                    placeholder="ユーザー名"
                    mb={4}
                    value={username}
                    onChange={handleUsernameChange}
                />
                <Textarea
                    placeholder="投稿内容を入力してください（200文字以内）"
                    mb={4}
                    value={content}
                    onChange={handleContentChange}
                    maxLength={200}
                />
                <Button colorScheme="orange" onClick={handleSubmit}>
                    投稿する
                </Button>
            </Box>
        </Flex>
    );
});

export default CreatePost;
