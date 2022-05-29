import { DatePipe } from '@angular/common';
import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  

  cliente: cliente={
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
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  
  create(): void{
    this.service.create(this.cliente).subscribe(resposta => {
      this.toast.success('clientes cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['clientes'])
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
      this.cliente.perfis.push(perfil);
      console.log(this.cliente.perfis);
        if(this.cliente.perfis.includes(perfil)){
          this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil),0);
        } else{
          this.cliente.perfis.push(perfil);
        }

    }

  
  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }
  
}
