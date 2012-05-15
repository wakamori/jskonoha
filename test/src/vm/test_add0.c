/****************************************************************************
 * Copyright (c) 2012, the Konoha project authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  * Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 ***************************************************************************/


#include "vmtest.h"

static KMETHOD int_opadd(CTX, ksfp_t *sfp, long _rix)
{
    RETURNi_(sfp[1].ivalue + sfp[2].ivalue);
}

int main(int argc, const char *argv[])
{
    kopl_t opbuf[128], *pc = opbuf;
    konoha_t konoha = konoha_open();
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg3 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 10;
    }

    {
        /* reg5 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 5;
        op->n = 20;
    }

    {
        /* reg1 = Int.add(10,20); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = int_opadd;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }

    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+4, pc);
        fprintf(stderr, "%ld\n", sfp[0].ivalue);
        assert(sfp[0].ivalue == 30);
    }
    konoha_close(konoha);
    MODGC_check_malloced_size();
    return 0;
}
