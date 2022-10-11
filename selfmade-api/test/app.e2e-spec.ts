import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from  "pactum"
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';
import { AdminAuthDto, UserAuthDto } from './../src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBoardgameDto, EditBoardgameDto } from 'src/boardgame/dto';

describe('Appe2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }));

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl("http://localhost:3333");
    
  });

  afterAll(() => {
    app.close();
  });

  const dto: UserAuthDto= {
    email: "lisa@cool.de",
    password: "Bla"
  };

  const dtoA: AdminAuthDto = {
    nickname: "coolerHut",
    password: "123MyLady"
  }

  describe("auth" ,() => {

    describe("signUpUser", () => {
      it("throw when email empty", () => {
        return pactum
        .spec()
        .post("/auth/signUpUser")
        .withBody({
          password: dto.password
        })
        .expectStatus(400);
      });

      it("throw when password empty", () => {
        return pactum
        .spec()
        .post("/auth/signUpUser")
        .withBody({
          email: dto.email
        })
        .expectStatus(400);
      });

      it("throw when nothing send", () => {
        return pactum
        .spec()
        .post("/auth/signUpUser")
        .expectStatus(400);
      });

      it("throw when email wrong", () => {
        return pactum
        .spec()
        .post("/auth/signUpUser")
        .withBody({
          email: "BlaHammer.de"
        })
        .expectStatus(400);
      });

      it("sign up", () => {
        return pactum
        .spec()
        .post("/auth/signUpUser")
        .withBody(dto)
        .expectStatus(201)
        .stores("userId", "id");
      });
    })

    describe("signUpAdmin", () => {
      it("throw when nickname empty", () => {
        return pactum
        .spec()
        .post("/auth/signUpAdmin")
        .withBody({
          password: dtoA.password
        })
        .expectStatus(400);
      });

      it("throw when password empty", () => {
        return pactum
        .spec()
        .post("/auth/signUpAdmin")
        .withBody({
          nickname: dtoA.nickname
        })
        .expectStatus(400);
      });

      it("throw when nothing send", () => {
        return pactum
        .spec()
        .post("/auth/signUpAdmin")
        .expectStatus(400);
      });

      it("throw when nickname wrong", () => {
        return pactum
        .spec()
        .post("/auth/signUpAdmin")
        .withBody({
          nickname: "BlaHammer"
        })
        .expectStatus(400);
      });

      it("sign up", () => {
        return pactum
        .spec()
        .post("/auth/signUpAdmin")
        .withBody(dtoA)
        .expectStatus(201);
      });
    })

    describe("sign in user", () => {
      it("throw when password wrong", () => {
        return pactum
        .spec()
        .post("/auth/signInUser")
        .withBody({
          email: dto.email,
          password: "text"
        })
        .expectStatus(403)
      })

      it("throw when email wrong", () => {
        return pactum
        .spec()
        .post("/auth/signInUser")
        .withBody({
          email: "gaggelkopf@boyz.de",
          password: dto.password
        })
        .expectStatus(403)
      })

      it("throw when both wrong", () => {
        return pactum
        .spec()
        .post("/auth/signInUser")
        .withBody({
          email: "gibberish@dumm.de",
          password: "text"
        })
        .expectStatus(403)
      })

      it("throw when nothing", () => {
        return pactum
        .spec()
        .post("/auth/signInUser")
        .expectStatus(400)
      })

      it("sign in", () => {
        return pactum
        .spec()
        .post("/auth/signInUser")
        .withBody(dto)
        .expectStatus(200)
        .stores("userAT", "access_token")
      })
    })

    
    describe("sign in admin", () => {
      it("throw when password wrong", () => {
        return pactum
        .spec()
        .post("/auth/signInAdmin")
        .withBody({
          nickname: dtoA.nickname,
          password: "text"
        })
        .expectStatus(403)
      })

      it("throw when nickname wrong", () => {
        return pactum
        .spec()
        .post("/auth/signInAdmin")
        .withBody({
          nickname: "gaggelkopf@boyz.de",
          password: dto.password
        })
        .expectStatus(403)
      })

      it("throw when both wrong", () => {
        return pactum
        .spec()
        .post("/auth/signInAdmin")
        .withBody({
          nickname: "gibberish",
          password: "text"
        })
        .expectStatus(403)
      })

      it("throw when nothing", () => {
        return pactum
        .spec()
        .post("/auth/signInAdmin")
        .expectStatus(400)
      })

      it("sign in", () => {
        return pactum
        .spec()
        .post("/auth/signInAdmin")
        .withBody(dtoA)
        .expectStatus(200)
        .stores("adminAT", "access_token")
      })
    })

    
  })

  describe("user" ,() => {
    const editDto: EditUserDto = {
        firstName: "Lisa",
        lastName: "Duente",
        Adress: "Hier im Dorf 3, 12345 irgendwo"
    }
    describe("GetMe", () => {
      it("should throw with admin token", ()=> {
        return pactum
        .spec()
        .get("/user/getMe")
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .expectStatus(401)
      })

      it("return user", ()=> {
        return pactum
        .spec()
        .get("/user/getMe")
        .withHeaders({
          Authorization: "Bearer $S{userAT}"
        })
        .expectStatus(200)
        .expectBodyContains(dto.email)
      })

    })

    describe("Edit User", () => {
      it("edit", ()=> {
        return pactum
        .spec()
        .patch("/user/editMe")
        .withHeaders({
          Authorization: "Bearer $S{userAT}"
        })
        .withBody(editDto)
        .expectStatus(200)
        .expectBodyContains(editDto.firstName)
        .expectBodyContains(editDto.lastName)
        .expectBodyContains(editDto.Adress)
      })

      it("edit firstname", ()=> {
        return pactum
        .spec()
        .patch("/user/editMe")
        .withHeaders({
          Authorization: "Bearer $S{userAT}"
        })
        .withBody({
          firstName: "Agnes"
        })
        .expectStatus(200)
        .expectBodyContains("Agnes")
      })

      it("edit lastname", ()=> {
        return pactum
        .spec()
        .patch("/user/editMe")
        .withHeaders({
          Authorization: "Bearer $S{userAT}"
        })
        .withBody({
          lastName: "Konni"
        })
        .expectStatus(200)
        .expectBodyContains("Konni")
      })

      it("edit address", ()=> {
        return pactum
        .spec()
        .patch("/user/editMe")
        .withHeaders({
          Authorization: "Bearer $S{userAT}"
        })
        .withBody({
          Adress: "Kirchdorferstrasse 123, 739584 Sonstewo"
        })
        .expectStatus(200)
        .expectBodyContains("Kirchdorferstrasse 123, 739584 Sonstewo")
      })

    })

    describe("Delete User", () => {
      it("delete user by user", () => {
        return pactum
        .spec()
        .delete("/user/deleteMe")
        .withHeaders({
          Authorization: "Bearer $S{userAT}"
        })
        .expectStatus(200)
      })
    })
  })

  describe("boardgame" ,() => {

    const BDto: CreateBoardgameDto = {
      name: "Blackbox",
      publisher: "Lisa Duente Verlag",
      category: "Quatsch",
      publicationDate: "2022-08-08"
    }

    const BDto2: CreateBoardgameDto = {
      name: "Blackbox2",
      publisher: "Lisa Duente Verlag",
      category: "Quatsch2",
      publicationDate: "2022-08-08"
    }

    describe("add boardgames", () => {
      it("should add boardgame", () => {
        return pactum 
        .spec()
        .post("/boardgame/addBoardgame")
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .withBody(BDto)
        .expectStatus(201)
        .expectBodyContains(BDto.name)
        .expectBodyContains(BDto.category)
        .expectBodyContains(BDto.publicationDate)
        .expectBodyContains(BDto.publisher)
      })

      it("should add boardgame2", () => {
        return pactum 
        .spec()
        .post("/boardgame/addBoardgame")
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .withBody(BDto2)
        .expectStatus(201)
        .expectBodyContains(BDto2.name)
        .expectBodyContains(BDto2.category)
        .expectBodyContains(BDto2.publicationDate)
        .expectBodyContains(BDto2.publisher)
        .stores("boardGameId","id")
      })

      it("should throw without title", () => {
        return pactum 
        .spec()
        .post("/boardgame/addBoardgame")
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .withBody({
          publisher: "Lisa Duente Verlag",
          category: "Quatsch",
          publicationDate: "2022-08-08"
        })
        .expectStatus(400)
      })

      it("should throw without publisher", () => {
        return pactum 
        .spec()
        .post("/boardgame/addBoardgame")
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .withBody({
          title: "Lisa Duente Verlag",
          category: "Quatsch",
          publicationDate: "2022-08-08"
        })
        .expectStatus(400)
      })

      it("should throw without category", () => {
        return pactum 
        .spec()
        .post("/boardgame/addBoardgame")
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .withBody({
          title: "Lisa Duente Verlag",
          publisher: "Quatsch",
          publicationDate: "2022-08-08"
        })
        .expectStatus(400)
      })

      it("should throw with same title", () => {
        return pactum 
        .spec()
        .post("/boardgame/addBoardgame")
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .withBody(BDto2)
        .expectStatus(403)
      })
    })

    describe("Get all games", () => {
      it("get list of all games", () => {
        return pactum 
        .spec()
        .get("/boardgame/allBoardgames")
        .expectStatus(200)
        .expectJsonLength(2)
      })
    })

    describe("Get game by title", () => {
      it("should return title", () => {
        return pactum 
        .spec()
        .get(`/boardgame/title/{title}`)
        .withPathParams("title",BDto2.name)
        .expectStatus(200)
        .expectBodyContains(BDto2.name)
      })

      it("should throw when not found", () => {
        return pactum 
        .spec()
        .get(`/boardgame/title/{title}`)
        .withPathParams("title","Ralalala")
        .expectStatus(404)
      })
    })

    describe("Get game by publisher", () => {
      it("should return publisher", () => {
        return pactum 
        .spec()
        .get(`/boardgame/publisher/{publisher}`)
        .withPathParams("publisher",BDto2.publisher)
        .expectStatus(200)
        .expectBodyContains(BDto2.publisher)
        .expectJsonLength(2)
      })

      it("should throw when not found", () => {
        return pactum 
        .spec()
        .get(`/boardgame/publisher/{publisher}`)
        .withPathParams("publisher","Ralalala")
        .expectStatus(404)
      })
    })

    describe("Get game by category", () => {
      it("should return category", () => {
        return pactum 
        .spec()
        .get(`/boardgame/category/{category}`)
        .withPathParams("category",BDto2.category)
        .expectStatus(200)
        .expectBodyContains(BDto2.category)
        .expectJsonLength(1)
      })

      it("should throw when not found", () => {
        return pactum 
        .spec()
        .get(`/boardgame/publisher/{publisher}`)
        .withPathParams("publisher","Ralalala")
        .expectStatus(404)
      })
    })

    describe("edit Boardgame", () => {
      const editBDto: EditBoardgameDto = {
        name: "new name",
        publisher: "vollkommenAugedacht",
        category: "RabenHumor",
        publicationDate: "irgendwas"
      }
      //here is a fail with "$S{boardGameId}" because the database doesn't reset like it should
      it("edit with all", ()=> {
        return pactum
        .spec()
        .patch("/boardgame/edit/{id}")
        .withPathParams("id", `$S{boardGameId}`)
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .withBody(editBDto)
        .expectStatus(200)
        .expectBodyContains(editBDto.name)
        .expectBodyContains(editBDto.publisher)
        .expectBodyContains(editBDto.category)
        .expectBodyContains(editBDto.publicationDate)
      })

      it("should throw when double title", ()=> {
        return pactum
        .spec()
        .patch("/boardgame/edit/{id}")
        .withPathParams("id", `$S{boardGameId}`)
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .withBody({
          name: editBDto.name
        })
        .expectStatus(403)
      })

      it("edit with name", ()=> {
        return pactum
        .spec()
        .patch("/boardgame/edit/{id}")
        .withPathParams("id", `$S{boardGameId}`)
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .withBody({
          name: "neuerName"
        })
        .expectStatus(200)
        .expectBodyContains("neuerName")
      })

      it("edit with publisher", ()=> {
        return pactum
        .spec()
        .patch("/boardgame/edit/{id}")
        .withPathParams("id", `$S{boardGameId}`)
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .withBody({
          publisher: "neuerPublisher"
        })
        .expectStatus(200)
        .expectBodyContains("neuerPublisher")
      })

      it("edit with publiDate", ()=> {
        return pactum
        .spec()
        .patch("/boardgame/edit/{id}")
        .withPathParams("id", `$S{boardGameId}`)
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .withBody({
          publicationDate: "2022-08-11"
        })
        .expectStatus(200)
        .expectBodyContains("2022-08-11")
      })
    })

    describe("Delete", () => {
      it("should delete by id", () => {
        return pactum 
        .spec()
        .delete("/boardgame/delete/{id}")
        .withPathParams("id", "$S{boardGameId}")
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .expectBodyContains("deleted")
      })

      it("should delete by title", () => {
        return pactum 
        .spec()
        .delete("/boardgame/deleteTitle/{title}")
        .withPathParams("title", "Blackbox")
        .withHeaders({
          Authorization: "Bearer $S{adminAT}"
        })
        .expectBodyContains("deleted")
      })
    })
  })

  describe("boardgameForUser" ,() => {

  })

  describe("admin" ,() => {

  })
});
