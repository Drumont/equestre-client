
export class HorseModel  {
    id: number;
    name: string;
    breed: string;
    createdBy: number;

    setHorse(horse: any) {
        this.id = horse.id || '';
        this.name = horse.name || '';
        this.breed = horse.breed || '';
        this.createdBy = horse.createdBy || '';
    }
}
