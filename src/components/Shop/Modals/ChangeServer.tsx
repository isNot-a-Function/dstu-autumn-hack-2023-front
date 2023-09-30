import CustomSelect from '../../UI/CustomSelect';
import { rustApi } from '../../../services/rustServices';
import { useLang } from '../../../hooks/useLang';
import { serviceModalChangeServerInInventory, serviceModalChangeServerTitle } from '../../../consts/modal';

interface ChangeServerProps {
  setSelectedServer: (value: number) => void;
}
const ChangeServer = ({ setSelectedServer }: ChangeServerProps) => {
  const { data: infoOfSelect, isLoading } = rustApi.useGetServersByModeQuery(Number(localStorage.getItem('section')));
  const handleChange = (event: any) => {
    setSelectedServer(event.value);
  };

  const selectOptions = () => {
    const servers = infoOfSelect
      ? infoOfSelect.map((item: any) => {
          return {
            label: item.name,
            value: String(item.id),
          };
        })
      : [];
    return [
      {
        label: useLang(serviceModalChangeServerInInventory),
        value: '0',
      },
      ...servers,
    ];
  };
  return (
    <div className="serverForActivation">
      <span className="serverForActivationTitle">{useLang(serviceModalChangeServerTitle)}</span>
      <CustomSelect options={selectOptions()} onChange={handleChange} menuPlacement="top" />
    </div>
  );
};
export default ChangeServer;
