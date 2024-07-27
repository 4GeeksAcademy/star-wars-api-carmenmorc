"""empty message

Revision ID: 9448d76fec88
Revises: 8f62bf7910a7
Create Date: 2024-07-27 18:16:04.285124

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9448d76fec88'
down_revision = '8f62bf7910a7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorite',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('favorite_id', sa.Integer(), nullable=False),
    sa.Column('favorite_type', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorite')
    # ### end Alembic commands ###
