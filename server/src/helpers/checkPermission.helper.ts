import { BadRequestException } from "@nestjs/common";
import { AccountInfoDTO } from "src/auth/dto/auth.dto";

export class Permission {
    static check(id:number,currentUser) {
        let {account_id,role_id} = currentUser.data;
        // console.log(account_id);
        // console.log(role_id)
        if(id === account_id) return;
        if(role_id === '1') return;
        throw new BadRequestException("USER can not perform action")
    }
}