"use client";
import useContact from "@/context/useContact";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { User } from "@/utils/types";
import axios from "axios";
import ApiRoute from "@/utils/apiRoute";
import Input from "./Input";
import Avatar from "./Avatar";
import { useSession } from "next-auth/react";
import Button from "./Button";
import ContactUserList from "./ContactUserList";

const AddContact = () => {
  const { data: session } = useSession();
  const { isOpen, onClose } = useContact();
  const [isLoad, setisLoad] = useState<boolean>(false);
  const [allUser, setallUser] = useState<User[]>([]);
  const [users, setusers] = useState<User[]>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newData = allUser.filter(
      (el) =>
        el?.name?.toLowerCase().includes(value?.toLowerCase()) ||
        el?.email?.toLowerCase().includes(value?.toLowerCase())
    );

    setusers((prev) => newData);
  };

  useEffect(() => {
    (async () => {
      if (!session?.user) return;
      try {
        setisLoad(false);
        const { data } = await axios.get(
          `http://localhost:8080/v1/user/all-user?email=${session?.user?.email}`
        );
        setallUser((prev) => data.data);
        setusers((prev) => data.data);
      } catch (er) {
      } finally {
        setisLoad(true);
      }
    })();
  }, [session?.user, isOpen]);
  return (
    <Modal title="Add Contacts" onChangeModal={onClose} value={isOpen}>
      <div className="flex flex-col ">
        <div className="flex justify-center items-center my-3">
          <Input
            placeholder="Search User ..."
            className="text-white"
            onChange={handleSearch}
          />
        </div>
        <div className="overflow-auto h-[16rem]">
          {!users?.length ? (
            <div className="flex justify-center items-center h-16 text-white/60">
              User Not Found !
            </div>
          ) : (
            users?.map((item) => {
              return <ContactUserList item={item} key={item?.id} />;
            })
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddContact;
