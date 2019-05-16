export default class  Settings {

    constructor(){
        this._container = document.createElement("div");
        this.getElement();
    }

    getElement(){
        const title = document.createElement("h1");
        title.innerText = "This is a Analytics sample page";
        this._container.appendChild(title);
        return this._container
    }
    getContainer(){
        return this._container;
    }
}