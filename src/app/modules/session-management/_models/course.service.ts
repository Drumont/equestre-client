
export class CourseModel  {
    id: number;
    title: string;
    started: any;
    duration: string;
    time: any;
    level: string;
    createdBy: number;
    cavalier: string;

    setCourse(course: any) {
        this.id = course.id || '';
        this.title = course.title || '';
        this.started = course.started || '';
        this.duration = course.duration || '';
        this.time = course.time || '';
        this.level = course.level || '';
        this.cavalier = course.cavalier || '';
    }
}
