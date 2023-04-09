import bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    f_name = db.Column(db.String(120), nullable=False)
    l_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(480), nullable=False)
    salt= db.Column(db.String(250), nullable=False)
    rol = db.Column(db.String(20), nullable=False)
    url_image = db.Column(db.String(250))
    created_at = db.Column(db.DateTime(timezone=True),  default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),  onupdate=func.now())
    is_active = db.Column(db.Boolean(), nullable=False)


    def __repr__(self):
        return f'<User {self.email}>'
    
    @classmethod
    def create(cls, body):
        try:
            user_is_valid = cls.user_exist(email=body.get("email"))
            if isinstance(user_is_valid, cls):
                raise Exception({
                    "message": "Invalid user",
                    "status": 400
                })
            if(user_is_valid) != False:
                raise Exception({
                    "message": "Internal application error",
                    "status": 500
                })
            
            salt_bytes = bcrypt.gensalt()
            salt = salt_bytes.decode()
            hashed_password = generate_password_hash(f'{body["password"]}{salt}')
            new_user = cls(f_name=body["f_name"], l_name=body["l_name"], rol="admin", email=body["email"], hashed_password=hashed_password, salt=salt, is_active=True, url_image=body["url_image"])
            if not isinstance(new_user, cls):
                raise Exception({
                    "message": "Internal application error",
                    "status": 500
                })
            saved = new_user.save_and_commit()
            if not saved:
                raise Exception({
                    "message": "Database error",
                    "status": 500
                })
            return new_user
        except Exception as error:
            return error.args[0]

    @classmethod
    def user_exist(cls, **kwargs):
        try:
            user_exist = cls.query.filter_by(email=kwargs["email"]).one_or_none()
            if user_exist:
                user = cls(id=user_exist.id ,email=user_exist.email, hashed_password=user_exist.hashed_password, salt=user_exist.salt, created_at=user_exist.created_at, updated_at=user_exist.updated_at)
                return user
            return False
        except Exception as error:
            return error.args[0]
            
    @classmethod
    def verify_credentials(cls, **kwargs):
        try:
            user = cls.user_exist(email=kwargs["email"])
            if not isinstance(user, cls):
                raise Exception({
                    "message": "Invalid user or password",
                    "status": 400
                })
            password_is_valid = check_password_hash(user.hashed_password, f'{kwargs["password"]}{user.salt}')
            if not password_is_valid:
                raise Exception({
                    "message": "Invalid user or password",
                    "status": 400
                })
            return user
        except Exception as error:
            return error.args[0]
    
    @classmethod
    def update_user(cls, body, user_id):
        try:
            user = cls.query.get(user_id)
            if body.get("f_name"):
                user.f_name = body["f_name"]
            if body.get("l_name"):
                user.l_name = body["l_name"]
            if body.get("l_name"):
                user.l_name = body["l_name"]
            if body.get("password"):
                hashed_password = generate_password_hash(f'{body["password"]}{user.salt}')
                user.hashed_password = hashed_password
            if body.get("url_image"):
                user.url_image = body["url_image"]
            db.session.commit()
            return user
        except Exception as error:
            return error.args[0]

    def save_and_commit(self):
        """
            Salva la instancia creada, en la base de datos. Si sucede algún error, 
            se retorna False y se revierten los cambios de la sesión
        """
        try:
            db.session.add(self)  #Guardamos la instancia en la sessión
            db.session.commit() #Creamos el registro en la db 
            return True
        except Exception as error:
            db.session.rollback() #Retornamos a la session mas reciente
            return False

    def serialize(self):
        return {
            "id": self.id,
            "f_name": self.f_name,
            "l_name": self.l_name,
            "email": self.email,
            "rol": self.rol,
            "url_image": self.url_image,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "is_active": self.is_active,
        }

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    barcode = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.String(120), nullable=False)
    ingredients = db.Column(db.ARRAY(db.String(50)), nullable=False)
    picture = db.Column(db.String(250))
    created_at = db.Column(db.DateTime(timezone=True),  default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),  onupdate=func.now())
    is_active = db.Column(db.Boolean(), nullable=False)

    @classmethod
    def create(cls, body):
        try:
            product_is_valid = cls.product_exist(barcode=body.get("barcode"))
            if isinstance(product_is_valid, cls):
                raise Exception({
                    "message": "Invalid product",
                    "status": 400
                })
            if(product_is_valid) != False:
                raise Exception({
                    "message": "Internal application error",
                    "status": 500
                })
            
            new_product = cls(barcode=body["barcode"], name=body["name"], price=body["price"], ingredients=body["ingredients"], is_active=True, picture=body["picture"])
            print(" ")
            print(" ")
            print(new_product)
            print(" ")
            print(" ")
            if not isinstance(new_product, cls):
                raise Exception({
                    "message": "Internal application error",
                    "status": 500
                })
            saved = new_product.save_and_commit()
            if not saved:
                raise Exception({
                    "message": "Database error",
                    "status": 500
                })
            return new_product
        except Exception as error:
            return error.args[0]

    @classmethod
    def product_exist(cls, **kwargs):
        try:
            product_exist = cls.query.filter_by(barcode=kwargs["barcode"]).one_or_none()
            if product_exist:
                product = cls(id=product_exist.id ,barcode=product_exist.barcode, name=product_exist.name, price=product_exist.price, ingredients=product_exist.ingredients, picture=product_exist.picture, is_active=product_exist.is_active, created_at=product_exist.created_at, updated_at=product_exist.updated_at)
                return product
            return False
        except Exception as error:
            return error.args[0]

    @classmethod
    def update_product(cls, body, barcode):
        try:
            product = cls.query.get(barcode)
            if body.get("name"):
                product.name = body["name"]
            if body.get("price"):
                product.price = body["price"]
            if body.get("ingredients"):
                product.ingredients = body["ingredients"]
            if body.get("picture"):
                product.picture = body["picture"]
            if body.get("is_active"):
                product.is_active = body["is_active"]
            db.session.commit()
            return product
        except Exception as error:
            return error.args[0]

    def save_and_commit(self):
        """
            Salva la instancia creada, en la base de datos. Si sucede algún error, 
            se retorna False y se revierten los cambios de la sesión
        """
        try:
            db.session.add(self)  #Guardamos la instancia en la sessión
            db.session.commit() #Creamos el registro en la db 
            return True
        except Exception as error:
            db.session.rollback() #Retornamos a la session mas reciente
            return False

    def serialize(self):
        return {
            "id": self.id,
            "barcode": self.barcode,
            "name": self.name,
            "price": self.price,
            "ingredients": self.ingredients,
            "picture": self.picture,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "is_active": self.is_active,
        }

class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticket= db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),  default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),  onupdate=func.now())
    status = db.Column(db.String(50), nullable=False)

    @classmethod
    def create(cls, body):
        try:
            order_is_valid = cls.order_exist(ticket=body.get("ticket"))
            if isinstance(order_is_valid, cls):
                raise Exception({
                    "message": "Invalid order",
                    "status": 400
                })
            if(order_is_valid) != False:
                raise Exception({
                    "message": "Internal application error",
                    "status": 500
                })
            
            new_order = cls(ticket=body["ticket"], status=body["status"])
            print(" ")
            print(" ")
            print(new_order)
            print(" ")
            print(" ")
            if not isinstance(new_order, cls):
                raise Exception({
                    "message": "Internal application error",
                    "status": 500
                })
            saved = new_order.save_and_commit()
            if not saved:
                raise Exception({
                    "message": "Database error",
                    "status": 500
                })
            return new_order
        except Exception as error:
            return error.args[0]

    @classmethod
    def order_exist(cls, **kwargs):
        try:
            order_exist = cls.query.filter_by(ticket=kwargs["ticket"]).one_or_none()
            if order_exist:
                order = cls(id=order_exist.id ,ticket=order_exist.ticket, status=order_exist.status, created_at=order_exist.created_at, updated_at=order_exist.updated_at)
                return order
            return False
        except Exception as error:
            return error.args[0]

    @classmethod
    def update_order(cls, body, ticket):
        try:
            order = cls.query.get(ticket)
            if body.get("ticket"):
                order.ticket = body["ticket"]
            if body.get("status"):
                order.status = body["status"]
            db.session.commit()
            return order
        except Exception as error:
            return error.args[0]

    def save_and_commit(self):
        """
            Salva la instancia creada, en la base de datos. Si sucede algún error, 
            se retorna False y se revierten los cambios de la sesión
        """
        try:
            db.session.add(self)  #Guardamos la instancia en la sessión
            db.session.commit() #Creamos el registro en la db 
            return True
        except Exception as error:
            db.session.rollback() #Retornamos a la session mas reciente
            return False

    def serialize(self):
        return {
            "id": self.id,
            "ticket": self.ticket,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "status": self.status,
        }
