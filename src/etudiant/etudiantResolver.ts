import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateClassementInput,
  CreateStudentInput,
} from 'src/input/studentInput';
import { Classement, Student } from 'src/models/etudiant';
import { StudentService } from './etudiantService';
import { Hopital, Place, Service } from 'src/models/stage';
import {
  CreateHopitalInput,
  CreateServiceInput,
  CreatePlaceInput,
} from 'src/input/hopitalInput';
import { Attribution } from 'src/models/attribution';

@Resolver('Student')
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  /****************************************************/
  /*********************STUDENT************************/
  /****************************************************/

  @Query(() => [Student])
  getStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Query(() => Student)
  getStudentById(@Args('id') id: number): Promise<Student> {
    return this.studentService.getStudentById(id);
  }

  @Query(() => Student)
  getStudentWithClassement(@Args('id') id: number): Promise<Student> {
    return this.studentService.getStudentWithClassement(id);
  }

  @Mutation(() => Student)
  createStudent(
    @Args('createStudent') createStudent: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudent);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args('id') id: number,
    @Args('updateStudent') updateStudent: CreateStudentInput,
  ): Promise<Student> {
    const student = new Student();
    Object.assign(student, updateStudent as Partial<Student>);
    return this.studentService.updateStudent(id, student);
  }

  @Mutation(() => Student)
  deleteStudent(@Args('id') id: number) {
    return this.studentService.deleteStudent(id);
  }

  /****************************************************/
  /******************STUDENT-CLASS*********************/
  /****************************************************/
  @Mutation(() => Classement)
  createClassement(
    @Args('createClassement') createClassement: CreateClassementInput,
  ): Promise<Classement> {
    return this.studentService.createClassement(createClassement);
  }

  @Mutation(() => Classement)
  updateClassement(
    @Args('id') id: number,
    @Args('updateClassement') updateClassement: CreateClassementInput,
  ): Promise<Classement> {
    const classement = new Classement();
    Object.assign(classement, updateClassement as Partial<Classement>);
    return this.studentService.updateClassement(id, classement);
  }

  /****************************************************/
  /**************HOPITAL-SERVICE-PLACE*****************/
  /****************************************************/

  @Mutation(() => Hopital)
  async createHopital(@Args('input') input: CreateHopitalInput) {
    return this.studentService.createHopital(input);
  }

  @Mutation(() => Service)
  async createService(@Args('input') input: CreateServiceInput) {
    return this.studentService.createService(input);
  }

  @Mutation(() => Place)
  async createPlace(@Args('input') input: CreatePlaceInput) {
    return this.studentService.createPlace(input);
  }

  @Mutation(() => Hopital)
  async updateHopital(
    @Args('id') id: number,
    @Args('input') input: CreateHopitalInput,
  ) {
    const hopital = new Hopital();
    Object.assign(hopital, input as Partial<Hopital>);
    return this.studentService.updateHopital(id, input);
  }

  @Query(() => [Hopital])
  getHopitals() {
    return this.studentService.getHopitals();
  }

  @Query(() => Hopital)
  async getHopital(@Args('id') id: number) {
    return this.studentService.getHopital(id);
  }

  @Query(() => [Place])
  getPlaces() {
    return this.studentService.getPlaces();
  }

  /****************************************************/
  /**************STAGE ATTIRIBUTION*******************/
  /****************************************************/
  @Mutation(() => [Attribution])
  async attribuerStages(): Promise<any> {
    const etudiants = await this.getStudents();
    const places = await this.getPlaces();

    const attributions: Map<string, string[]> = new Map(); // matricule -> [hopital-service]
    const placesDisponibles = new Map<string, number>();

    // Initialize available places
    places.forEach((place) => {
      placesDisponibles.set(`${place.hopital}-${place.service}`, place.places);
    });

    // Assign stages
    etudiants.forEach((etudiant) => {
      const sortedClassements = etudiant.classements.sort(
        (a, b) => a.rang - b.rang || a.typepref - b.typepref,
      );

      let attributed = false;
      for (const classement of sortedClassements) {
        const key = `${classement.hopital}-${classement.service}`;
        if (placesDisponibles.has(key) && placesDisponibles.get(key)! > 0) {
          if (!attributions.has(etudiant.matricule)) {
            attributions.set(etudiant.matricule, []); // Initialize with an empty array
          }
          attributions.get(etudiant.matricule)!.push(key);
          placesDisponibles.set(key, placesDisponibles.get(key)! - 1);
          attributed = true;
          break;
        }
      }

      if (!attributed) {
        // Find another place with available spots
        for (const [key, value] of placesDisponibles) {
          if (value > 0) {
            if (!attributions.has(etudiant.matricule)) {
              attributions.set(etudiant.matricule, []); // Initialize with an empty array
            }
            attributions.get(etudiant.matricule)!.push(key);
            placesDisponibles.set(key, value - 1);
            attributed = true;
            break;
          }
        }
      }
    });

    const attributionsArray = Array.from(attributions.entries()).map(
      ([matricule, hopitalService]) => ({
        matricule,
        hopitalService: hopitalService.join(', '),
      }),
    );
    return attributionsArray;
  }
}
