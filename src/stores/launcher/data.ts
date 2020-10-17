import { action, observable } from "mobx";
import ConnectFormStore, { ConnectFormData } from "./connectForm";

interface LauncherData {
    connectForm: ConnectFormData;
}

class LauncherDataStore {
    connectFormStore = new ConnectFormStore();

    @observable isLoading = false;
    @observable gotData = false;

    @action loadData(): void {
        this.isLoading = true;

        window.launcher.loadData()
        .then(fileContent => {
            var data: LauncherData;
            try {
                data = JSON.parse(fileContent);
            } catch (error) {
                console.warn("Could not parse launcher's data");
            }
            return data;
        })
        .then(launcherData => {
            this.connectFormStore.setData(launcherData?.connectForm);
        })
        .finally(
            action(() => {
                this.isLoading = false;
                this.gotData = true;
            })
        );
    }
}

export default LauncherDataStore;