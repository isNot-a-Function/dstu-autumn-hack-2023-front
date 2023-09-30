import Copy from '../Copy';

export interface ScaleOnlineProps {
  IP: string;
  currentOnline: number;
  maxPlayers: number;
  name: string;
  port: string;
  serverID?: number;
}

const ScaleOnline = ({ name, maxPlayers, currentOnline, IP, port }: ScaleOnlineProps) => {
  return (
    <div className="boxScaleWithTitle">
      <div className="headerScale">
        <p className="titleScale"> {name}</p>
        <Copy className="iconCopy" value={IP + ':' + port} />
      </div>
      <div className="boxScale">
        <div className="activeScale" style={{ width: `${(currentOnline / maxPlayers) * 100}%` }}>
          <p className="labelScale">{String(currentOnline) + '/' + String(maxPlayers)}</p>
        </div>
      </div>
    </div>
  );
};

export default ScaleOnline;
