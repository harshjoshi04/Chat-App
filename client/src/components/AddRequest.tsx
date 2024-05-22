"use client";
import useRequest from "@/context/useRequest";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import axios from "axios";
import ApiRoute from "@/utils/apiRoute";
import useUser from "@/context/useUser";
import { RequestType } from "@/utils/types";
import RequestList from "./RequestList";

const AddRequest = () => {
  const { userData } = useUser();
  const { isOpen, onClose } = useRequest();
  const [isUpdate, setisUpdate] = useState(false);
  const [AllRequest, setAllRequest] = useState<RequestType[]>([]);
  const [Requests, setRequests] = useState<RequestType[]>([]);

  const handleUpdate = () => setisUpdate(!isUpdate);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${ApiRoute.REQUEST}/${userData?.id}`);
        setAllRequest(data.data);
        setRequests(data.data);
      } catch (er) {}
    })();
  }, [isOpen, isUpdate]);

  return (
    <Modal title="Request's" onChangeModal={onClose} value={isOpen}>
      <div className="flex flex-col ">
        <div className="flex justify-center items-center my-3">
          <Input placeholder="Search User ..." className="text-white" />
        </div>
        <div className="overflow-auto h-[16rem]">
          {!Requests.length ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg">Request is empty !</p>
            </div>
          ) : (
            Requests.map((item) => (
              <RequestList
                key={item?.createdAt}
                item={item}
                handleUpdate={handleUpdate}
              />
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddRequest;
