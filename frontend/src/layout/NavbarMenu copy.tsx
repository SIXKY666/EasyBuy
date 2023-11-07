import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import {io} from "socket.io-client";
import { product_add } from "../service/product.js";
import "./layout.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { roomState } from "@/config/atom/roomAtom.js";
const socket = io("http://localhost:3000");

function NavbarMenu() {
  const setRoomState = useSetRecoilState(roomState);
  const room = useRecoilValue(roomState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ data, setData ] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const rooms = [
    { value: "room1", name: "Room 1" },
    { value: "room2", name: "Room 2" },
    { value: "room3", name: "Room 3" },
  ];

  const addProduct = async () => {
    const res = await product_add(data);
    if (res.status === 200) {
      console.log(res.data);
      socket.emit("new-product", ({room:room,name:res.name}));
    } else {
      console.log("error");
    }
  };

  const changeRoom = (e:any) => {
    e.preventDefault()
    if(e?.target){
      setRoomState(e.target.value);
    }
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Product name"
                  onChange={e =>
                    setData(prevData => ({
                      ...prevData,
                      name: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Price"
                  onChange={e =>
                    setData(prevData => ({
                      ...prevData,
                      price: Number(e.target.value),
                    }))
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="description"
                  onChange={e =>
                    setData(prevData => ({
                      ...prevData,
                      description: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={() => addProduct()} mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="navbar">
        <Menu isLazy>
          <MenuButton>Menu</MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Add Product</MenuItem>
          </MenuList>
        </Menu>
        <Select
          w={200}
          variant="filled"
          size={"sm"}
          placeholder="Select Room"
          className="select"
          onChange={changeRoom}
        >
          {rooms.map((room, index) => (
            <option key={index} value={room.value}>
              {room.name}
            </option>
          ))}
        </Select>
      </div>
    </>
  );
}

export default NavbarMenu;
