// eslint-disable-next-line
export default {
    name: {
        required: true,
        label: "Name",
        minValue: 3,
    },
    email: {
        isEmail: true,
        required: true,
        label: "Email",
    },
    gender: {
        required: true,
        label: "Gender",
    },
    phone: {
        required: true,
        label: "Phone",
        maxValue: 10,
        minValue: 10,
    },
    address: {
        required: true,
        label: "Address",
        minValue: 5,
    },
    nationality: {
        required: true,
        label: "Nationality",
    },
    dob: {
        required: true,
        label: "Date of Birth",
    },
    education_background: {
        required: true,
        label: "Education Background",
    },
    contact_mode: {
        required: true,
        label: "Contact Mode",
    },
};
