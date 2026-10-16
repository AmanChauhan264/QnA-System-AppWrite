import {db} from "../name";
import createAnswerCollection from "./answer.collection";;
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import {databases} from "./config";
import { create } from "domain";

export default async function getOrCreateDB(){
    try {
        await databases.get(db)
        console.log("database connected")
    } catch (error) {
        try {
            await databases.create(db, db)
            console.log("database created")
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection(),
            ])
            console.log("collection created")
            console.log("databses connected")
        } catch (error) {
            console.log("error creating databases or collection", error)
        }
    }
    return databases;
}