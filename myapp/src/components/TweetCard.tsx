import { FC, memo } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { postData } from "../types/postData"
import { useHistory } from 'react-router-dom';

type Props = {
    post: postData
}



const TweetCard: FC<Props> = memo(props => {
    const { post } = props;

    const history = useHistory();

    const handleClick = () => {
        // クリックしたときの処理
        // ここでは詳細ページへの遷移を想定しています
        history.push(`/post/detail/${post.id}`);
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
                w={['100%', '80%']}
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
            >
                <Text fontWeight="bold">{post.name}</Text>
                <Text>{post.body}</Text>
                <Text color="gray.500" mt={2} fontSize="sm">
                    {post.created}
                </Text>
            </Box>
        </Flex>
    );
});

export default TweetCard;
