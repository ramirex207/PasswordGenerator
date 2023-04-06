import React from 'react'
import { useState } from 'react'
import '../sass/Formulario.scss'
import { ButtonCheck, ButtonDecrese, ButtonGenerate, ButtonIncrease } from './Button'

function Formulario() {
    const [contador, setContador] = useState(8)
    const [configuration, setConfiguration] = useState({
        simbolos:true,
        numeros:true,
        mayusculas:true
    })
    const[password, setPassword] = useState('vsddfsas')
    function aumentarContador(){
        setContador(contador + 1)
        if(contador>=15){
            setContador(15);
        }
    }
    function disminuirContador(){
        setContador(contador - 1)
        if (contador<=5){
            setContador(5);
        }
    }
    function cambiarNumeros(){
        setConfiguration({
            ...configuration,
            numeros: !configuration.numeros
        })
    }
    function cambiarSimbolos(){
        setConfiguration({
            ...configuration,
            simbolos: !configuration.simbolos
        })
    }
    function cambiarMayusculas(){
        setConfiguration({
            ...configuration,
            mayusculas: !configuration.mayusculas
        })
    }
    function generarContraseña() {
        const caracteres = 'abcdefghijklmnopqrstuvwxyz'
        const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const simbolos = '!@#$%^&*()'
        const numeros = '0123456789'
        let contrasena = ''
        
        const maxCaracteres = contador
        
        let numCaracteres = 0
        let numSimbolos = 0
        let numNumeros = 0
        let numMayusculas = 0
        
        // Calcular cuántos caracteres, símbolos y números se deben agregar
        if (configuration.simbolos) {
            numSimbolos = Math.floor(maxCaracteres / 4)
                if (numSimbolos > 0) {
                    numCaracteres += numSimbolos
                }
        }
        
        if (configuration.numeros) {
                numNumeros = Math.floor(maxCaracteres / 4)
                    if (numNumeros > 0) {
                numCaracteres += numNumeros
                }
        }
        
        if (configuration.mayusculas) {
            numMayusculas = Math.floor(maxCaracteres / 4)
            if (numMayusculas > 0) {
                numCaracteres += numMayusculas
            }
        }
        const numLetras = maxCaracteres - numSimbolos - numNumeros - numMayusculas
        if (numLetras > 0) {
            numCaracteres += numLetras
        }
        
        // Generar la contraseña
        let listaCaracteres = []
        for (let i = 0; i < numLetras; i++) {
          const letra = caracteres[Math.floor(Math.random() * caracteres.length)]
            listaCaracteres.push(letra)
        }
        
        for (let i = 0; i < numSimbolos; i++) {
          const simbolo = simbolos[Math.floor(Math.random() * simbolos.length)]
            listaCaracteres.push(simbolo)
        }
        
        for (let i = 0; i < numNumeros; i++) {
          const numero = numeros[Math.floor(Math.random() * numeros.length)]
            listaCaracteres.push(numero)
        }
        
        for (let i = 0; i < numMayusculas; i++) {
          const mayuscula = mayusculas[Math.floor(Math.random() * mayusculas.length)]
            listaCaracteres.push(mayuscula)
        }
        // Mezclar los caracteres con el algoritmo de Fisher-Yates
        for (let i = listaCaracteres.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = listaCaracteres[i]
            listaCaracteres[i] = listaCaracteres[j]
            listaCaracteres[j] = temp
        }
        contrasena = listaCaracteres.join('')
        setPassword(contrasena)
    }  
    return (
    <div className='form'>
            <label className='form__fila1'>Numero de carcateres</label>
            <div className='form__fila2'>
                <ButtonDecrese click= {disminuirContador}/>
                <span>{contador}</span>
                <ButtonIncrease click={aumentarContador}/>
            </div>

            <label className='form__fila1'>¿Incluir Simbolos?</label>
            <div className='form__fila2'>
                <ButtonCheck estado={configuration.simbolos} click={cambiarSimbolos}/>
            </div>

            <label className='form__fila1'>¿Incluir Numeros?</label>
            <div className='form__fila2'>
                <ButtonCheck estado={configuration.numeros} click={cambiarNumeros} />
            </div>

            <label className='form__fila1'>¿Incluir Mayusculas?</label>
            <div className='form__fila2'>
                <ButtonCheck estado = {configuration.mayusculas} click={cambiarMayusculas}/>
            </div>
            <ButtonGenerate estado = {configuration} click={generarContraseña}/>
            <input className='form__input' type="text" readOnly={true} value={password}/>
    </div>
)
}

export { Formulario }