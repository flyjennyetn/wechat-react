/**
 * Created by flyjennyetn on 2016-10-24.
 */
import login from './login'
import courses from './courses'
import quizzes from './quizzes'
import subject from './subject'
import user from './user'

export default function* rootSaga() {
	yield* login();
	yield* courses();
	yield* quizzes();
	yield* subject();
	yield* user();
}