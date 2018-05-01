import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class EventsService {

    constructor(public http: HttpClient) {}

    getNotes() {
        return this.http.get('/api/notes');
    }

    pushNotes(object) {
        return this.http.post('/api/notes', object);
    }

    removeNote(id) {
        return this.http.delete(`/api/notes/${id}`);
    }
    
    updateNote(id, title) {
        return this.http.put(`/api/notes/${id}`,{title: title});
    }

    getToday() {
        return this.http.get('/api/today');
    }
}
