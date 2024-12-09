import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from 'src/etudiant/etudiant.module';
import { Classement, Student } from './models/etudiant';
import { Hopital, Place, Service } from './models/stage';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        name: 'testulb',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: 'student_stage',
        entities: [Student, Classement, Hopital, Place, Service],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    StudentModule,
  ],
  controllers: [],
  providers: [StudentModule],
})
export class AppModule {}
