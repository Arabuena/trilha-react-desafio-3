import React from 'react';
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai'; 
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";

import {
    Container,
    Title,
    Column,
    TitleLogin,
    SubtitleLogin,
    EsqueciText,
    CriarText,
    Row,
    Wrapper
} from './styles';

const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais 
                    tecnologias e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
    <Input placeholder="Nome Completo" leftIcon={<AiOutlineUser />} name="nomeCompleto" control={control} />
    {errors.nomeCompleto && <span>Nome Completo é obrigatório</span>}
    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
    {errors.email && <span>E-mail é obrigatório</span>}
    <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
    {errors.senha && <span>Senha é obrigatória</span>}
   
</form>

                <Row>
                    <EsqueciText>Esqueci minha senha</EsqueciText>
                    <Button title="Cadastrar" variant="secondary" type="submit" />
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }