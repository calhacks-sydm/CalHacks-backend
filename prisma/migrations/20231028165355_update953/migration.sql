/*
  Warnings:

  - You are about to drop the column `id` on the `QuestionsDone` table. All the data in the column will be lost.
  - Added the required column `count` to the `Subproblems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subproblems" ADD COLUMN     "count" INT8 NOT NULL;

-- RedefineTables
CREATE TABLE "_prisma_new_QuestionsDone" (
    "user_id" INT8 NOT NULL,
    "question_id" INT8 NOT NULL,
    "score" STRING NOT NULL,

    CONSTRAINT "QuestionsDone_pkey" PRIMARY KEY ("user_id","question_id")
);
INSERT INTO "_prisma_new_QuestionsDone" ("question_id","score","user_id") SELECT "question_id","score","user_id" FROM "QuestionsDone";
DROP TABLE "QuestionsDone" CASCADE;
ALTER TABLE "_prisma_new_QuestionsDone" RENAME TO "QuestionsDone";
ALTER TABLE "QuestionsDone" ADD CONSTRAINT "QuestionsDone_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "QuestionsDone" ADD CONSTRAINT "QuestionsDone_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
