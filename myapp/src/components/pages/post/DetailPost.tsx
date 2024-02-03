// components/DetailPost.tsx
import { FC, memo } from 'react';
import { useDetailPost } from '../../hooks/useDetailPost';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Text, Flex, Button, Textarea } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useToastMessage } from '../../hooks/useToastMessage';

const DetailPost: FC = memo(() => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { showMessage } = useToastMessage();
    const { post, isEditing, editedBody, setEditedBody, handleEditClick, handleCancelEdit, handleSaveClick, handleDeleteClick } = useDetailPost(parseInt(id));

    const confirmDelete = () => {
        if (window.confirm('本当に削除しますか？')) {
            handleDeleteClick();
            showMessage({ title: "削除しました", status: "success" });
            history.push("/");
        }
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
                {post ? (
                    <>
                        <Text fontWeight="bold">{post.username}</Text>            
                        {isEditing ? (
                            <>
                                <Flex>
                                    <Textarea
                                        value={editedBody}
                                        onChange={(e) => setEditedBody(e.target.value)}
                                    />
                                    <Box p={2}>
                                        <CloseIcon onClick={handleCancelEdit} />
                                    </Box>
                                </Flex>
                            </>
                        ) : (
                            <Text>{post.body}</Text>
                        )}
                        <Text color="gray.500" mt={2} fontSize="sm">
                            {post.created_at}
                        </Text>

                        {isEditing ? (
                            <Flex justifyContent="space-between" alignItems="center">
                                <Button colorScheme="orange" onClick={handleSaveClick}>
                                        保存する<CheckIcon />
                                </Button>
                            </Flex>
                        ) : (
                            <Flex justifyContent="space-between" alignItems="center">
                                <EditIcon onClick={handleEditClick} />
                                <DeleteIcon onClick={confirmDelete} />
                            </Flex>
                        )}
                    </>
                ) : (
                    <Text>Loading...</Text>
                )}
            </Box>
        </Flex>
    );
});

export default DetailPost;
