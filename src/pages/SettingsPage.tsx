// TODO: Design this page

import Settings from "../components/Settings";

const SettingsPage: React.FC = () => {
  return (
    <main className="flex flex-col p-2">
      <div className="p-2">
        <h2 className="text-3xl">Settings</h2>
      </div>
      <Settings />
    </main>
  );
};

export default SettingsPage;
