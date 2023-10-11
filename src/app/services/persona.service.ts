import { Injectable } from '@angular/core';
import { Persona } from '../model/Persona'; // Asegúrate de tener la ruta correcta hacia tu clase Persona

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private personas: Persona[] = [];

  // Método para agregar una nueva persona
  agregarPersona(persona: Persona): void {
    this.personas.push(persona);
  }

  // Método para obtener la lista de personas
  obtenerPersonas(): Persona[] {
    return this.personas;
  }

  // Método para obtener una persona por su ID
  obtenerPersonaPorId(id: number): Persona | undefined {
    return this.personas.find(persona => persona.id === id);
  }

  // Método para actualizar los detalles de una persona
  actualizarPersona(persona: Persona): void {
    const index = this.personas.findIndex(p => p.id === persona.id);
    if (index !== -1) {
      this.personas[index] = persona;
    }
  }

  // Método para eliminar una persona por su ID
  eliminarPersona(id: number): void {
    const index = this.personas.findIndex(persona => persona.id === id);
    if (index !== -1) {
      this.personas.splice(index, 1);
    }
  }
}
