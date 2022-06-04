import { DatePipe } from '@angular/common';
import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  

  tecnico: tecnico={
    id:'',
    nome:'',
    cpf:'',
    email:'',
    senha:'',
    perfis: [],
    dataCriacao: Date
  }
  nome: FormControl = new FormControl(null,Validators.minLength(3));
  cpf: FormControl = new FormControl(null,Validators.minLength(11));
  email: FormControl = new FormControl(null,Validators.email);
  senha: FormControl = new FormControl(null,Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  
  create(): void{
    this.service.create(this.tecnico).subscribe(resposta => {
      this.toast.success('Técnico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['tecnicos'])
    }, ex =>{
      console.log(ex);
      if(ex.error.errors){
        ex.error.errors.forEach(element =>{
          this.toast.error(element.message);
        });
      }else{
        this.toast.error(ex.error.message);
      }      
    })
  }

    addPerfil(perfil: any): void{
      this.tecnico.perfis.push(perfil);
      console.log(this.tecnico.perfis);
        if(this.tecnico.perfis.includes(perfil)){
          this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil),0);
        } else{
          this.tecnico.perfis.push(perfil);
        }

    }

  
  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }
  
}
