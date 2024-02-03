
import { Box, Flex, Heading,Link, useDisclosure } from "@chakra-ui/react";
import { memo, FC, useCallback } from "react";
import { MenuIconButton } from "../../atoms/button/MenuIconButton"
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useHistory } from "react-router-dom";

export const Header: FC = memo(
    () => {
        const {isOpen,onOpen,onClose} = useDisclosure();
        const history = useHistory();

        const onClickHome = useCallback(() => history.push("/"), []) ;
        const onClickPostCreate = useCallback(() => history.push("/post/create"), []) ;
        return (
             <>
            <Flex as="nav" 
            bg="cyan.500"
            color="gray.50"
            align="center"
            justify="space-between"
            padding={ { base: 3 ,md: 5}}
            >
                    <Flex align={"center"} as={"a"} mr={8} _hover={{ cursor: "pointer" }} onClick={onClickHome}>
                    <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
                        GO+TS 掲示板
                    </Heading>
                </Flex>
                
                <Flex align={ "center"} fontSize={"sm"} flexGrow={2} display={{base: "none",md : "flex"}}>
                        <Link onClick={onClickPostCreate}>
                        新規投稿
                    </Link>
                </Flex>
                <MenuIconButton onOpen={onOpen} />
            </Flex>
                <MenuDrawer onClose={onClose} isOpen={isOpen} onClickHome={onClickHome} onClickPostCreate={onClickPostCreate} />
            </>
        );
    }
)