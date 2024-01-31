import { BcryptHash } from "@common/infrastructure/hash/bcryptHasht";

const bcrypthash = new BcryptHash({
    salt: 10
});

export {bcrypthash};