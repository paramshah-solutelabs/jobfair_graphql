import { Injectable } from '@nestjs/common';
import { Tokens } from './tokens.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './../../src/candidates/candidate.entity';
import { Employee } from './../../src/employees/employees.entity';

import { v4 as uuid } from 'uuid';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Tokens)
    private tokenRepository: Repository<Tokens>,
  ) {}

  async createToken(user: Candidate | Employee, token: string) {
    const today = new Date();
    const expiryDate = new Date(today.setDate(today.getDate() + 15));

    const existingToken = await this.tokenRepository.findOne({
      where: [{ candidate: { id: user.id } }, { employee: { id: user.id } }],
    });

    if (existingToken) {
      await this.tokenRepository.remove(existingToken);
    }
    const tokenCreation = this.tokenRepository.create({
      token,
      candidate: user instanceof Candidate ? user : null,
      employee: user instanceof Employee ? user : null,
      expiryDate,
    });

    return await this.tokenRepository.save(tokenCreation);
  }

  async deleteToken(id: number) {
    const foundToken = await this.tokenRepository.findOne({ where: { id } });
    if (!foundToken) {
      throw new NotFoundException('Token not found');
    }
    await this.tokenRepository.remove(foundToken);
  }

  async validateToken(token: string): Promise<Tokens> {
    if (!token) {
      throw new NotFoundException('Provide a token');
    }
    const existingToken = await this.tokenRepository.findOne({
      where: { token },
    });
    if (!existingToken) {
      throw new NotFoundException('Invalid token');
    }
    const currentDate = new Date();
    const isValid = existingToken.expiryDate > currentDate;
    if (!isValid) {
      throw new BadRequestException('Token is no longer valid');
    }
    return existingToken;
  }
}
