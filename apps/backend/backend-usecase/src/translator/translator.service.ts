import { Clause, Condition } from '@my-workspace/domain';
import { Injectable } from '@nestjs/common';


@Injectable()
export class TranslatorService {
  isClause(clause: Clause | Condition): clause is Clause {
    return (clause as Clause).joiner !== undefined;
  }

  isCondition(condition: Clause | Condition): condition is Condition {
    return (condition as Condition).value !== undefined;
  }

  translate(clause: Condition | Clause): string {
    if (this.isClause(clause)) {
      let returnValue = '';

      switch (clause.joiner) {
        case 'and':
          returnValue += ` $and: { `;
          break;
        case 'or':
          returnValue += ` $or: { `;
          break;
      }

      let index = 0;

      for (const condition of clause.conditions) {
        if (this.isClause(condition)) {
          returnValue += this.translate(condition);
        } else {
          if (this.isCondition(condition)) {
            switch (condition.operator) {
              case 'equal':
                returnValue += `$eq: { ${condition.name}: ${condition.value} }`;
                break;
              case 'greaterThan':
                returnValue += `$gt: { ${condition.name}: ${condition.value} }`;
                break;
              case 'lessThan':
                returnValue += `$lt: { ${condition.name}: ${condition.value} }`;
                break;
            }
          }

          if (clause.conditions.length > index + 1) {
            returnValue += ', ';
          }

          index++;
        }
      }
      return returnValue + ' }, ';
    }
  }
}
