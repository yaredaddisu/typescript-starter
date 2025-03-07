// bet.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BetDocument = Bet & Document;

@Schema()
export class Selection {
  @Prop({ required: true })
  matchId: string;

  @Prop({ required: true })
  league: string;

  @Prop({ required: true })
  homeTeam: string;

  @Prop({ required: true })
  awayTeam: string;

  @Prop({ required: true })
  eventDateTime: Date;

  @Prop({ required: true })
  marketType: string;

  @Prop({ required: true })
  betSelection: string;

  @Prop({ required: true })
  odds: number;

  @Prop({ enum: ['Pending', 'Win', 'Lose'], default: 'Pending' })
  betResult?: string;
}

export const SelectionSchema = SchemaFactory.createForClass(Selection);

@Schema()
export class Bet {
  [x: string]: any;
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  ticketId: string;

  @Prop({ required: true })
  stake: number;

  @Prop({ required: true })
  totalOdds: number;

  @Prop({ required: true })
  potentialWin: number;

  @Prop({ enum: ['Pending', 'Won', 'Lost', 'Cancelled'], default: 'Pending' })
  status: string;

  @Prop({ default: Date.now })
  placedAt: Date;

  @Prop({ enum: ['Not Paid', 'Paid'], default: 'Not Paid' })
  payoutStatus: string;

  @Prop({ type: [SelectionSchema], default: [] })
  selections: Selection[];
}

export const BetSchema = SchemaFactory.createForClass(Bet);
