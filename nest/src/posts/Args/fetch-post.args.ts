import { ArgsType, Field} from "@nestjs/graphql";

@ArgsType()
export class FetchPostArgs {
    @Field({ nullable: true })
    id?: number

    @Field({ nullable: true })
    title?: string
}
