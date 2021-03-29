import { LightningElement } from "lwc";
import inputsJSON from "@salesforce/resourceUrl/inputs";

export default class DynamicForm extends LightningElement {
    inputs = [];
    data = {};

    connectedCallback() {
        fetch(inputsJSON)
            .then((response) => response.json())
            .then((data) => (this.inputs = this.orderInputs(data)));
    }

    orderInputs(data) {
        return data.sort((input1, input2) =>
            input1.order > input2.order ? 1 : -1
        );
    }

    handleChangeInput(event) {
        const dataset = event.currentTarget.dataset;
        const attributeName = dataset.attributename;
        this.data[attributeName] = event.target.value;

        this.handleCPFInputMask(attributeName, event);
    }

    handleCPFInputMask(attributeName, event) {
        if (attributeName === "cpf") {
            let v = event.target.value;
            v = v.replace(/\D/g, "");
            v = v
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

            event.target.value = v;
        }
    }
}
