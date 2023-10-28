import express, { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());


// USERS ===============
app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    console.log(users);
    return res.json(users);
})

app.post('/users', async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;
    const user = await prisma.user.create({
        data: {
            first_name,
            last_name,
            email,
            password
        }
    });
    console.log(user);
    return res.json(user);
})

app.put('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;
    const user = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            first_name,
            last_name,
            email,
            password
        }
    });
    console.log(user);
    return res.json(user);
})

app.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    });
    console.log(user);
    return res.json(user);
})

app.post('/users/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            email,
            password
        }
    });
    console.log(user);
    return res.json(user);
})

app.get('/courseInfo', async (req: Request, res: Response) => {
    const courseInfo = await prisma.courseInfo.findMany();
    console.log(courseInfo);
    return res.json(courseInfo);
})

// Manually create a course

// TOPICS ===============
app.get('/topics', async (req: Request, res: Response) => {
    const topics = await prisma.topics.findMany();
    console.log(topics);
    return res.json(topics);
})

app.post('/topics', async (req: Request, res: Response) => {
    const { topic_name, course_id } = req.body;
    const topic = await prisma.topics.create({
        data: {
            topic_name,
            course_id
        }
    });
    console.log(topic);
    return res.json(topic);
})


// QUESTIONS ===============

app.get('/questions', async (req: Request, res: Response) => {
    const questions = await prisma.questions.findMany();
    console.log(questions);
    return res.json(questions);
})

app.post('/questions', async (req: Request, res: Response) => {
    const { question, topic_id, hint } = req.body;
    const questions = await prisma.questions.create({
        data: {
            question,
            topic_id,
            hint
        }
    });
    console.log(questions);
    return res.json(questions);
})

app.put('/questions/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { question, topic_id, hint } = req.body;
    const questions = await prisma.questions.update({
        where: {
            id: Number(id)
        },
        data: {
            question,
            topic_id,
            hint
        }
    });
    console.log(questions);
    return res.json(questions);
})

app.delete('/questions/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const questions = await prisma.questions.delete({
        where: {
            id: Number(id)
        }
    });
    console.log(questions);
    return res.json(questions);
})

// SUBPROBLEMS ===============
app.post('/questions/:id/subproblems', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { count } = req.body;
    const subproblems = await prisma.subproblems.findFirst({
        where: {
            question_id: Number(id),
            count
        }
    });
    console.log(subproblems);
    return res.json(subproblems);
})

// MANUALLY CREATE SUBPROBLEMS

// SOLUTIONS ===============
app.get('/solutions', async (req: Request, res: Response) => {
    const solutions = await prisma.solutions.findMany();
    console.log(solutions);
    return res.json(solutions);
})

app.post('/solutions', async (req: Request, res: Response) => {
    const { solution, question_id } = req.body;
    const solutions = await prisma.solutions.create({
        data: {
            solution,
            question_id
        }
    });
    console.log(solutions);
    return res.json(solutions);
})

app.put('/solutions/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { solution, question_id } = req.body;
    const solutions = await prisma.solutions.update({
        where: {
            id: Number(id)
        },
        data: {
            solution,
            question_id
        }
    });
    console.log(solutions);
    return res.json(solutions);
})

app.delete('/solutions/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const solutions = await prisma.solutions.delete({
        where: {
            id: Number(id)
        }
    });
    console.log(solutions);
    return res.json(solutions);
})

app.post('/solutions/findone', async (req: Request, res: Response) => {
    const { question_id } = req.body;
    const solutions = await prisma.solutions.findFirst({
        where: {
            question_id
        }
    });
    console.log(solutions);
    return res.json(solutions);
})

// QUESTIONs DONE ===============
app.get('/user/:id/questionsdone', async (req: Request, res: Response) => {
    const { id } = req.params;
    const questionsDone = await prisma.questionsDone.findMany({
        where: {
            user_id: Number(id)
        }
    });
    console.log(questionsDone);
    return res.json(questionsDone);
})

app.post('/user/:id/questionsdone/create', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { question_id, score } = req.body;
    const questionsDone = await prisma.questionsDone.create({
        data: {
            user_id: Number(id),
            question_id,
            score
        }
    });
    console.log(questionsDone);
    return res.json(questionsDone);
})

app.put('/user/:id/questionsdone/update/:question_id', async (req: Request, res: Response) => {
    const { user_id, question_id } = req.params;
    const { score } = req.body;
    const questionsDone = await prisma.questionsDone.update({
        where: {
            user_id_question_id: {
                user_id: Number(user_id),
                question_id: Number(question_id)
            }
        },
        data: {
            score
        }
    });
})


const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});