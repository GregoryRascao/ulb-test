import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateHopitalInput,
  CreateServiceInput,
  CreatePlaceInput,
} from 'src/input/hopitalInput';
import {
  CreateClassementInput,
  CreateStudentInput,
} from 'src/input/studentInput';
import { Classement, Student } from 'src/models/etudiant';
import { Hopital, Place, Service } from 'src/models/stage';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Classement)
    private classementRepository: Repository<Classement>,
    @InjectRepository(Hopital) private hopitalRepository: Repository<Hopital>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
    @InjectRepository(Place) private placeRepository: Repository<Place>,
  ) {}

  //STUDENT
  getStudent() {
    return this.studentRepository.find();
  }

  createStudent(student: CreateStudentInput) {
    const newStudent = this.studentRepository.create(student);
    return this.studentRepository.save(newStudent);
  }

  getStudentById(id: number) {
    return this.studentRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getStudentWithClassement(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['classements'],
    });

    console.log('student', student);

    return student;
  }

  updateStudent(id: number, student: Student) {
    return this.studentRepository.update(id, student);
  }

  deleteStudent(id: number) {
    return this.studentRepository.delete(id);
  }

  // STUDENT_CLASS
  createClassement(classement: CreateClassementInput) {
    const newClassement = this.classementRepository.create(classement);
    return this.classementRepository.save(newClassement);
  }

  getStudentClassement() {
    return this.classementRepository.find();
  }

  updateClassement(id: number, classement: Classement) {
    return this.classementRepository.update(id, classement);
  }

  // HOPITAL
  async createHopital(hopital: CreateHopitalInput) {
    const newHopital = this.hopitalRepository.create(hopital);
    return this.hopitalRepository.save(newHopital);
  }
  async createService(service: CreateServiceInput) {
    const newService = this.serviceRepository.create(service);
    return this.serviceRepository.save(newService);
  }

  async createPlace(place: CreatePlaceInput) {
    const newPlace = this.placeRepository.create(place);
    return this.placeRepository.save(newPlace);
  }

  async getHopitals() {
    return this.hopitalRepository.find();
  }

  async getPlaces() {
    return this.placeRepository.find();
  }

  async getHopital(id: number) {
    return this.hopitalRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateHopital(id: number, hopital: CreateHopitalInput) {
    return this.hopitalRepository.update(id, hopital);
  }
}
