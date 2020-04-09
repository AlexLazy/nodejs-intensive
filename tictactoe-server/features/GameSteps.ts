import { binding, before, given, when, then } from "cucumber-tsflow";
import { expect } from "chai";
import request from "Supertest";

import app from "../src/app";

import * as controller from "../src/controllers/game";

@binding()
export class GameSteps {
  private getResult: request.Response;
  private moveResult: request.Response;

  private fieldToString(field: number[][]): string {
    return field.map((row) => row.join("")).join("|");
  }

  private stringToField(str: string): number[][] {
    return str
      .split("|")
      .map((str) => str.split("").map((char) => Number(char)));
  }

  @before()
  public beforeAllScenarios(): void {
    controller.reset();
  }

  @given("пустое поле")
  public givenVoidField(): void {
    controller.reset();
  }

  @given("ходит игрок {int}")
  public givenPlayerTurn(i: number) {
    controller.setCurrentPlayer(i);
  }

  @given("поле {string}")
  public givenField(str: string): void {
    controller.presetField(this.stringToField(str));
  }

  @when("игрок ходит в клетку {int}, {int}")
  public playerTurnInCell(x: number, y: number) {
    return request(app)
      .post("/move")
      .send({ x, y })
      .then((res) => {
        this.moveResult = res;
        return request(app)
          .get("/getField")
          .then((res) => (this.getResult = res));
      });
  }

  @then("поле становится {string}")
  public field(field: string) {
    expect(field).to.equal(this.fieldToString(this.getResult.body));
  }

  @then("возвращается ошибка")
  public throwError() {
    expect(this.moveResult.status).to.equal(418);
  }

  @then("победил игрок {int}")
  public winnerIs(player: number) {
    expect(this.moveResult.body.winner).to.equal(player);
  }
}
