<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="" class="navbar-brand">MEVN</a>
        </nav>

        <div class="container mt-5">
            <div class="row">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendnote()">
                                <div class="form-group">
                                    <input type="text" v-model="note.name" id="" placeholder="Insert a note" class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea name="" v-model="note.description" id="" cols="30" rows="10" class="form-control" placeholder="Insert a description"></textarea>
                                </div>
                                <template v-if="(!updatable)">
                                    <button type="submit" class="btn btn-primary btn-block">Send</button>
                                </template>
                                <template v-else>
                                    <button type="submit" class="btn btn-primary btn-block">Edit</button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Note</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in notes" :key="index">
                                <td>{{item.name}}</td>
                                <td>{{item.description}}</td>
                                <td>
                                    <div class="btn-group">
                                        <button @click="editnote(item._id)" class="btn btn-warning"><span class="fa fa-edit"></span></button>
                                        <button @click="deletenote(item._id)" class="btn btn-danger"><span class="fa fa-trash"></span></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

class Note {
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}
export default {
    data() {
        return {
            note: new Note(),
            notes: [],
            updatable: false,
            noteToEdit: ''
        }
    },created(){
        this.getnotes();
    },
    methods: {
        getnotes(){
            fetch('/api/note')
            .then(res => res.json())
            .then(data => this.notes = data);
        },
        sendnote() {
            if(!this.updatable){
                fetch('/api/note', {
                    method: 'POST',
                    body: JSON.stringify(this.note),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getnotes();
                    });
            } else {
                fetch('/api/note/' + this.noteToEdit, {
                    method: 'PUT',
                    body: JSON.stringify(this.note),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.updatable = false;
                    this.getnotes();
                });
            }
            this.note = new Note();
        },
        deletenote(id) {
            fetch('/api/note/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getnotes();
            });
        },
        editnote(id){
            fetch('/api/note/' + id)
            .then(res => res.json())
            .then(data => {
                this.note = new Note(data.name, data.description);
                this.noteToEdit = data._id;
                this.updatable = true;
            });
        }
    }
}
</script>