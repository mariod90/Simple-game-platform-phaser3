import Constants from '../constants';

export default class HandlerBD {
    public data: any;

    constructor() {
        if(JSON.parse(localStorage.getItem(Constants.DATABASE.NAME))) {
            this.data = JSON.parse(JSON.stringify(Constants.DATABASE.NAME));
        }else{
            this.createBD();
        }
    }

    private createBD() {
        let initialBD = {
            music: true,
            effects: true,
            score: {
                level1: 0,
                level2: 0,
                level3: 0
            }
        }
        this.data = initialBD;
        localStorage.setItem(Constants.DATABASE.NAME, JSON.stringify(this.data));
    }

    public saveData() {
        localStorage.setItem(Constants.DATABASE.NAME, JSON.stringify(this.data));
    }
}
