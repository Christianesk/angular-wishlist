import { v4 as uuid } from 'uuid';

export class DestinoViajeModel {

    private selected: boolean;

    public servicios: string[];

    id = uuid();

    public votes = 0;

    constructor(public nombre: string, public url: string, public descripcion: string) {
        this.servicios = ['pileta', 'desayuno']
    }

    isSelected(): boolean {
        return this.selected;
    }

    setSelected(s: boolean) {
        this.selected = s;
    }

    voteUp(): any {
        this.votes++;
    }
    voteDown(): any {
        this.votes--;
    }
}