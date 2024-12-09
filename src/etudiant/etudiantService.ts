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

  /****************************************************/
  /*********************STUDENT************************/
  /****************************************************/

  getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  createStudent(student: CreateStudentInput): Promise<Student> {
    const newStudent = this.studentRepository.create(student);
    return this.studentRepository.save(newStudent);
  }

  getStudentById(id: number): Promise<Student> {
    return this.studentRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getStudentWithClassement(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['classements'],
    });
    return student;
  }

  async updateStudent(id: number, student: Student): Promise<Student> {
    await this.studentRepository.update(id, student);
    return this.studentRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  deleteStudent(id: number) {
    return this.studentRepository.delete(id);
  }

  /****************************************************/
  /******************STUDENT-CLASS*********************/
  /****************************************************/

  createClassement(classement: CreateClassementInput): Promise<Classement> {
    const newClassement = this.classementRepository.create(classement);
    return this.classementRepository.save(newClassement);
  }

  async updateClassement(
    id: number,
    classement: Classement,
  ): Promise<Classement> {
    await this.classementRepository.update(id, classement);
    return this.classementRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  /****************************************************/
  /**************HOPITAL-SERVICE-PLACE*****************/
  /****************************************************/

  async createHopital(hopital: CreateHopitalInput): Promise<Hopital> {
    const newHopital = this.hopitalRepository.create(hopital);
    return this.hopitalRepository.save(newHopital);
  }
  async createService(service: CreateServiceInput): Promise<Service> {
    const newService = this.serviceRepository.create(service);
    return this.serviceRepository.save(newService);
  }

  async createPlace(place: CreatePlaceInput): Promise<Place> {
    const newPlace = this.placeRepository.create(place);
    return this.placeRepository.save(newPlace);
  }

  async getHopitals(): Promise<Hopital[]> {
    return this.hopitalRepository.find();
  }

  async getPlaces(): Promise<Place[]> {
    return this.placeRepository.find();
  }

  async getHopital(id: number): Promise<Hopital> {
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
