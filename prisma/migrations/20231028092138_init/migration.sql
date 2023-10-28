/*
  Warnings:

  - Added the required column `hint` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "hint" STRING NOT NULL;

-- CreateTable
CREATE TABLE "Subproblems" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "question_id" INT8 NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,

    CONSTRAINT "Subproblems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subproblems" ADD CONSTRAINT "Subproblems_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
