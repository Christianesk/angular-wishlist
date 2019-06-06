
export class DestinoViajeModel {

    private selected: boolean;

    constructor(public nombre: string, public imagenUrl: string, public descripcion: string) { }

    isSelected(): boolean {
        return this.selected;
    }

    setSelected(s:boolean) {
        this.selected = s;
    }
}