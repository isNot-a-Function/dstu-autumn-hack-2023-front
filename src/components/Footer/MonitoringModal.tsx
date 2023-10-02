import React from "react";
import Modal from "../UI/Modal";
import ScaleOnline from "./ScaleOnline";
import { ScaleOnlineProps } from "./ScaleOnline";
import { useLang } from "../../hooks/useLang";
import { topUpMonitoringServers } from "../../consts/modal";

interface MonitoringModalProps {
  isActive: boolean;
  setIsActive: (param: boolean) => void;
  data: ScaleOnlineProps[];
}

const MonitoringModal = ({
  isActive,
  setIsActive,
  data,
}: MonitoringModalProps) => {
  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={useLang(topUpMonitoringServers)}
      className="monitoringModal"
    >
      <>
        {/* <div className="monitoringModalContainer">
          {data.map((server, index) => (
            <ScaleOnline
              key={index}
              maxPlayers={server.maxPlayers}
              currentOnline={server.currentOnline}
              rating={5}
            />
          ))}
        </div> */}
      </>
    </Modal>
  );
};

export default MonitoringModal;
