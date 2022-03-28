import { Injectable } from '@angular/core'
import { Student } from '../students/student'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'

@Injectable({
    providedIn: 'root'
})
export class StudentsService {
    private studentsPath: string = '/students'
    private studentsCollection!: AngularFirestoreCollection<Student>

    constructor(private db: AngularFirestore) {
        console.log('loading data from db', this.db.collection(this.studentsPath))
        this.studentsCollection = this.db.collection(this.studentsPath)
    }

    createStudent(student: Student): void {
        student.isActive = false
        console.log('creating student', student)
        this.studentsCollection.add({ ...student })
    }

    updateStudent(key: string, value: any) {
        this.studentsCollection.doc(key).update(value)
    }

    deleteStudent(key: string) {
        console.log('delete', key)
        this.studentsCollection.doc(key).delete()
    }

    getStudentsCollection(): AngularFirestoreCollection<Student> {
        return this.studentsCollection
    }

    deleteAll() {
        this.studentsCollection.get().subscribe(snapshot => {
            snapshot.forEach(doc => {
                doc.ref.delete()
            })
        },
        e => {
            console.error('Error while removing student', e)
        })
    }
}
