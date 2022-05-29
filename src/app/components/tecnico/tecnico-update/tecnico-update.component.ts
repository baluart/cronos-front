import { DatePipe } from '@angular/common';
import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  this.tecnico.id = this.route.snapshot.paramMap.get('id');
this.findById(); }

  findById(): void{
    this.service.findById(this.tecnico.id).subscribe(resposta =>{
      resposta.perfis =[]
      this.tecnico = resposta;
    })
  }
  
  
  update(): void{
    this.service.update(this.tecnico).subscribe(resposta => {
      this.toast.success('Técnico Atualizado com sucesso', 'update');
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
          this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil),1);
        } else{
          this.tecnico.perfis.push(perfil);
        }

    }

  
  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }
  
}
