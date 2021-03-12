export class Client {
    public id?: string;
    public name?: string;
    public gender?: string;
    public phone?: string;
    public email?: string;
    public address?: string;
    public nationality?: string;
    public dob?: string;
    public education_background?: string;
    public contact_mode?: string;

    constructor(
        id?: string,
        name?: string,
        gender?: string,
        phone?: string,
        email?: string,
        address?: string,
        nationality?: string,
        dob?: string,
        education_background?: string,
        contact_mode?: string
    ) {
        this.id = id ? id : "";
        this.email = email ? email : "";
        this.name = name ? name : "";
        this.gender = gender ? gender : "";
        this.nationality = nationality ? nationality : "";
        this.dob = dob ? dob : "";
        this.education_background = education_background ? education_background : "";
        this.contact_mode = contact_mode ? contact_mode : "";
        this.address = address ? address : "";
        this.phone = phone ? phone : "";
    }
}
