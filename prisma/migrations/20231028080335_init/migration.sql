-- CreateTable
CREATE TABLE "User" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "first_name" STRING NOT NULL,
    "last_name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsDone" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "user_id" INT8 NOT NULL,
    "question_id" INT8 NOT NULL,
    "score" STRING NOT NULL,

    CONSTRAINT "QuestionsDone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseInfo" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "course_name" STRING NOT NULL,

    CONSTRAINT "CourseInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topics" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "topic_name" STRING NOT NULL,
    "course_id" INT8 NOT NULL,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "question" STRING NOT NULL,
    "topic_id" INT8 NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solutions" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "question_id" INT8 NOT NULL,
    "solution" STRING NOT NULL,

    CONSTRAINT "Solutions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Solutions_question_id_key" ON "Solutions"("question_id");

-- AddForeignKey
ALTER TABLE "QuestionsDone" ADD CONSTRAINT "QuestionsDone_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsDone" ADD CONSTRAINT "QuestionsDone_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topics" ADD CONSTRAINT "Topics_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "CourseInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solutions" ADD CONSTRAINT "Solutions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
