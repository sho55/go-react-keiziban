import { memo, FC } from "react";
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, Button } from "@chakra-ui/react";

type Props = {
    onClose: () => void;
    isOpen: boolean;
    onClickHome:() => void;
    onClickPostCreate:() => void;
}

export const MenuDrawer: FC<Props> = memo(
    (props) => {
        const { onClose, isOpen, onClickHome, onClickPostCreate } = props;
        return (
            <Drawer placement="left" size={"xs"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerBody p={0} bg={"gray.100"}>
                            <Button w={"100%"} onClick={onClickHome}>
                                TOP
                            </Button>
                            <Button w={"100%"} onClick={onClickHome}>
                                投稿一覧
                            </Button>
                            <Button w={"100%"} onClick={onClickPostCreate}>
                                新規投稿
                            </Button>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        );
    }
)